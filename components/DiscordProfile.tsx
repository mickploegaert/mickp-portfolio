import { useState, useEffect, useRef } from 'react';

interface DiscordUser {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
  discriminator?: string;
}

interface Activity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    small_image?: string;
    large_text?: string;
    small_text?: string;
  };
  application_id?: string;
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
}

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url?: string;
  timestamps?: {
    start: number;
    end: number;
  };
}

interface PresenceData {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify?: SpotifyData;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  active_on_discord_web?: boolean;
  display_name?: string;
}

export default function DiscordLanyard({ userId = '719831189585657877' }: { userId?: string }) {
  const [presenceData, setPresenceData] = useState<PresenceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const dataTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatElapsedTime = (startTimestamp: number) => {
    const now = Date.now();
    let elapsed = Math.floor((now - startTimestamp) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (activity: Activity) => {
    if (activity.assets?.large_image) {
      let imageUrl = activity.assets.large_image;

      if (imageUrl.startsWith('spotify:')) {
        const spotifyId = imageUrl.replace('spotify:', '');
        return `https://i.scdn.co/image/${spotifyId}`;
      }

      if (imageUrl.startsWith('mp:external/')) {
        const match = imageUrl.match(/https\/(.*)/i);
        if (match?.[1]) {
          return `https://${match[1]}`;
        }
        return null;
      }

      if (!imageUrl.startsWith('http')) {
        return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imageUrl}.png`;
      }

      return imageUrl;
    }
    return null;
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { bgColor: string; text: string; dotColor: string }> = {
      online: { bgColor: 'bg-green-500', text: 'Online', dotColor: 'bg-green-500' },
      idle: { bgColor: 'bg-yellow-500', text: 'Idle', dotColor: 'bg-yellow-500' },
      dnd: { bgColor: 'bg-red-500', text: 'Do Not Disturb', dotColor: 'bg-red-500' },
      offline: { bgColor: 'bg-gray-500', text: 'Offline', dotColor: 'bg-gray-500' },
    };
    return statusMap[status] || statusMap.offline;
  };

  const getUserAvatar = (data: PresenceData) => {
    if (data.discord_user?.avatar) {
      const avatarId = data.discord_user.avatar;
      const userId = data.discord_user.id;
      const format = avatarId.startsWith('a_') ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.${format}?size=128`;
    }
    return null;
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      if (dataTimeoutRef.current) {
        clearTimeout(dataTimeoutRef.current);
      }
    };

    const initializeConnection = () => {
      setLoading(true);

      const timeout = setTimeout(() => {
        if (isMounted && !presenceData) {
          setError('Timeout waiting for Discord data');
          setLoading(false);
        }
      }, 10000);
      dataTimeoutRef.current = timeout;

      fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          if (isMounted && data.success) {
            setPresenceData(data.data);
            setError(null);
            setLoading(false);
            if (dataTimeoutRef.current) clearTimeout(dataTimeoutRef.current);
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          if (isMounted) {
            setError('Failed to load Discord data');
            setLoading(false);
          }
        });

      socketRef.current = new WebSocket('wss://api.lanyard.rest/socket');

      socketRef.current.addEventListener('open', () => {
        socketRef.current?.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_ids: [userId] },
        }));

        heartbeatRef.current = setInterval(() => {
          socketRef.current?.send(JSON.stringify({ op: 3 }));
        }, 30000);
      });

      socketRef.current.addEventListener('message', event => {
        const message = JSON.parse(event.data);
        if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
          const data = message.d?.[userId] || message.d;
          if (isMounted && data) {
            setPresenceData(data);
            setError(null);
            setLoading(false);
            if (dataTimeoutRef.current) clearTimeout(dataTimeoutRef.current);
          }
        }
      });

      socketRef.current.addEventListener('error', () => {
        console.warn('WebSocket error');
        if (isMounted) {
          setError('Connection error');
        }
      });
    };

    initializeConnection();

    return cleanup;
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] shadow-xl overflow-hidden text-black flex-shrink-0 self-start border border-gray-300">
        <div className="h-24 bg-gray-200" />
        <div className="p-6 border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 -mt-14 animate-pulse" />
            <div className="ml-5 mt-2 flex-1">
              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="p-6 text-center text-gray-600 flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading Discord presence...
        </div>
      </div>
    );
  }

  if (error || !presenceData) {
    return (
      <div className="bg-white rounded-xl w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] shadow-xl overflow-hidden text-black flex-shrink-0">
        <div className="p-6 text-center">
          <div className="text-lg font-semibold text-red-600 mb-2">Connection Error</div>
          <p className="text-sm text-gray-600">{error || 'Could not load Discord presence'}</p>
        </div>
      </div>
    );
  }

  const displayName = presenceData.display_name || presenceData.discord_user?.global_name || presenceData.discord_user?.username || 'User';
  const username = presenceData.discord_user?.username || 'User';
  const discriminator = presenceData.discord_user?.discriminator && presenceData.discord_user.discriminator !== '0' ? `#${presenceData.discord_user.discriminator}` : '';
  const avatarUrl = getUserAvatar(presenceData);
  const statusInfo = getStatusInfo(presenceData.discord_status);

  const allActivities = presenceData.activities || [];

  return (
    <div className="bg-white rounded-xl w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] shadow-xl overflow-hidden text-black flex-shrink-0 self-start border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
      <style>{`
        .code-tags-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 0.06;
          pointer-events: none;
        }
        
        .code-tag {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 24px;
          color: #6b7280;
          animation: float-tag 20s linear infinite;
        }
        
        .code-tag:nth-child(1) { left: 10%; top: 20%; animation-duration: 25s; animation-delay: 0s; }
        .code-tag:nth-child(2) { left: 70%; top: 40%; animation-duration: 30s; animation-delay: -5s; }
        .code-tag:nth-child(3) { left: 40%; top: 60%; animation-duration: 28s; animation-delay: -10s; }
        .code-tag:nth-child(4) { left: 80%; top: 15%; animation-duration: 22s; animation-delay: -15s; }
        .code-tag:nth-child(5) { left: 20%; top: 70%; animation-duration: 26s; animation-delay: -8s; }
        
        @keyframes float-tag {
          0% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="relative">
        <div className="h-24 bg-cover bg-center bg-gray-200" style={{ backgroundImage: "url('https://dcdn.dstn.to/banners/719831189585657877')" }} />
        
        <div className="p-6 border-b border-gray-300 pb-7">
          <div className="flex items-center">
            <div className="relative w-24 h-24 mr-5 -mt-14">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 bg-gray-300 shadow-lg flex items-center justify-center text-black font-bold text-3xl">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  displayName.charAt(0)
                )}
              </div>
              <span className={`absolute -bottom-1 right-2 w-6 h-6 rounded-full border-4 border-white ${statusInfo.dotColor}`} />
            </div>
            
            <div className="mt-2">
              <div className="text-2xl font-extrabold text-black drop-shadow-sm">
                {displayName}
                <span className="text-gray-600 text-base italic font-medium ml-2">({username}{discriminator})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {allActivities.length > 0 ? (
        allActivities
          .filter(activity => {
            if (activity.name === 'Spotify') return false;
            const isCoding = activity.application_id === '383226320970055681' ||
                           activity.name?.toLowerCase().includes('visual studio code') ||
                           activity.name?.toLowerCase().includes('vs code') ||
                           activity.name?.toLowerCase().includes('cursor') ||
                           activity.name?.toLowerCase().includes('webstorm') ||
                           activity.name?.toLowerCase().includes('intellij') ||
                           activity.name?.toLowerCase().includes('pycharm') ||
                           activity.name?.toLowerCase().includes('phpstorm');
            return isCoding;
          })
          .map((activity, idx) => (
            <ActivityItem key={idx} activity={activity} formatElapsedTime={formatElapsedTime} getActivityIcon={getActivityIcon} />
          ))
      ) : null}
    </div>
  );
}

function ActivityItem({ activity, formatElapsedTime, getActivityIcon }: {
  activity: Activity;
  formatElapsedTime: (ts: number) => string;
  getActivityIcon: (activity: Activity) => string | null;
}) {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    if (activity.timestamps?.start) {
      const updateElapsed = () => {
        setElapsed(formatElapsedTime(activity.timestamps!.start!));
      };
      
      updateElapsed();
      const interval = setInterval(updateElapsed, 1000);
      return () => clearInterval(interval);
    }
  }, [activity.timestamps?.start, formatElapsedTime]);

  const activityIcon = getActivityIcon(activity);
  
  const isCoding = activity.application_id === '383226320970055681' ||
                   activity.name?.toLowerCase().includes('visual studio code') ||
                   activity.name?.toLowerCase().includes('vs code') ||
                   activity.name?.toLowerCase().includes('cursor') ||
                   activity.name?.toLowerCase().includes('webstorm') ||
                   activity.name?.toLowerCase().includes('intellij') ||
                   activity.name?.toLowerCase().includes('pycharm') ||
                   activity.name?.toLowerCase().includes('phpstorm');

  if (isCoding) {
    const fileName = activity.details || '';
    const workspaceName = activity.state || '';
    
    return (
      <div className="p-4 transition-colors duration-200 border-t border-gray-300 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="code-tags-bg">
          <div className="code-tag">&lt;/&gt;</div>
          <div className="code-tag">{'{ }'}</div>
          <div className="code-tag">&lt;div&gt;</div>
          <div className="code-tag">( )</div>
          <div className="code-tag">[ ]</div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start gap-3">
            {activityIcon && (
              <img src={activityIcon} alt={activity.name} className="w-16 h-16 rounded object-cover flex-shrink-0 shadow-md" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="font-bold text-blue-600 text-base">
                  Coding in {activity.name}
                </div>
              </div>
              
              {fileName && (
                <div className="text-sm text-gray-800 font-mono bg-white/60 px-2 py-1 rounded mb-2 border border-gray-200">
                  📄 {fileName}
                </div>
              )}
              
              {workspaceName && (
                <div className="text-xs text-gray-600 mb-2">
                  📁 {workspaceName}
                </div>
              )}
              
              {activity.timestamps?.start && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {elapsed} elapsed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}