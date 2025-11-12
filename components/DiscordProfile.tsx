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

  const formatSongTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
      <div className="bg-white rounded-xl w-96 shadow-xl overflow-hidden text-black flex-shrink-0 self-start border border-gray-300">
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
      <div className="bg-white rounded-xl w-96 shadow-xl overflow-hidden text-black flex-shrink-0">
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

  const spotifyActivity = presenceData.listening_to_spotify && presenceData.spotify;
  const otherActivities = presenceData.activities?.filter(a => a.name !== 'Spotify') || [];

  return (
    <div className="bg-white rounded-xl w-[460px] shadow-xl overflow-hidden text-black flex-shrink-0 self-start border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
      <style>{`
        .spotify-eq-bg .eq-bar {
          width: 18%;
          margin: 0 1%;
          border-radius: 0;
          animation: eqbar-up 1.1s infinite;
          background: #1DB954;
          opacity: 0.6;
          align-self: flex-end;
          height: var(--eq-base, 60%);
        }
        .spotify-eq-bg .eq-bar:nth-child(1) { animation-delay: 0s; }
        .spotify-eq-bg .eq-bar:nth-child(2) { animation-delay: 0.12s; }
        .spotify-eq-bg .eq-bar:nth-child(3) { animation-delay: 0.24s; }
        .spotify-eq-bg .eq-bar:nth-child(4) { animation-delay: 0.18s; }
        .spotify-eq-bg .eq-bar:nth-child(5) { animation-delay: 0.3s; }
        .spotify-eq-bg .eq-bar:nth-child(6) { animation-delay: 0.08s; }
        .spotify-eq-bg .eq-bar:nth-child(7) { animation-delay: 0.2s; }
        .spotify-eq-bg .eq-bar:nth-child(8) { animation-delay: 0.32s; }
        .spotify-eq-bg .eq-bar:nth-child(9) { animation-delay: 0.16s; }
        @keyframes eqbar-up {
          0%, 100% { height: var(--eq-base, 60%); }
          20% { height: calc(var(--eq-base, 60%) + 60%); }
          40% { height: calc(var(--eq-base, 60%) + 30%); }
          60% { height: calc(var(--eq-base, 60%) + 50%); }
          80% { height: calc(var(--eq-base, 60%) + 20%); }
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

      {spotifyActivity && (
        <SpotifyActivity spotify={presenceData.spotify!} formatSongTime={formatSongTime} />
      )}

      {otherActivities.length > 0 ? (
        otherActivities.map((activity, idx) => (
          <ActivityItem key={idx} activity={activity} index={idx} formatElapsedTime={formatElapsedTime} getActivityIcon={getActivityIcon} />
        ))
      ) : !spotifyActivity ? (
        <div className="p-4 text-center text-gray-600">No activities right now</div>
      ) : null}
    </div>
  );
}

function SpotifyActivity({ spotify, formatSongTime }: {
  spotify: SpotifyData;
  formatSongTime: (ms: number) => string;
}) {
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('0:00');
  const [total, setTotal] = useState('0:00');

  useEffect(() => {
    if (spotify.timestamps) {
      const updateProgress = () => {
        const now = Date.now();
        const totalMs = spotify.timestamps!.end - spotify.timestamps!.start;
        const elapsedMs = Math.max(0, Math.min(now - spotify.timestamps!.start, totalMs));
        const percent = Math.min(100, (elapsedMs / totalMs) * 100);
        
        setProgress(percent);
        setElapsed(formatSongTime(elapsedMs));
        setTotal(formatSongTime(totalMs));
      };

      updateProgress();
      const interval = setInterval(updateProgress, 200);
      return () => clearInterval(interval);
    }
  }, [spotify, formatSongTime]);

  return (
    <div className="p-3 hover:bg-gray-100 transition-colors duration-200 border-t border-green-600/70 shadow-md relative overflow-hidden">
      <div className="absolute left-0 right-0 bottom-0 h-10 flex items-end pointer-events-none z-0 spotify-eq-bg">
        <div className="flex h-full w-full items-end justify-between gap-0.5">
          {[60, 80, 40, 90, 70, 55, 65, 50, 85].map((height, i) => (
            <div key={i} className="eq-bar" style={{ '--eq-base': `${height}%` } as React.CSSProperties} />
          ))}
        </div>
      </div>
      
      <div className="flex items-start relative z-10">
        <div className="flex-shrink-0 mr-3">
          {spotify.album_art_url ? (
            <img src={spotify.album_art_url} alt="Album Art" className="w-16 h-16 rounded object-cover" />
          ) : (
            <div className="w-16 h-16 bg-[#1DB954] rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <div className="font-semibold text-green-600 drop-shadow-sm">Listening to Spotify</div>
          </div>
          <div className="text-sm text-black font-medium mt-1">{spotify.song}</div>
          <div className="text-xs text-gray-700">by {spotify.artist}</div>
          <div className="text-xs text-gray-700 mb-2">on {spotify.album}</div>
          
          <div className="mt-2 mb-2">
            <div className="bg-gray-300 h-1.5 rounded-full w-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-700">
            <span>{elapsed}</span>
            <span>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ activity, index, formatElapsedTime, getActivityIcon }: {
  activity: Activity;
  index: number;
  formatElapsedTime: (ts: number) => string;
  getActivityIcon: (activity: Activity) => string | null;
}) {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    if (activity.timestamps?.start) {
      setElapsed(formatElapsedTime(activity.timestamps.start));
      const interval = setInterval(() => {
        setElapsed(formatElapsedTime(activity.timestamps!.start!));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activity, formatElapsedTime]);

  const activityIcon = getActivityIcon(activity);
  
  const activityTypeMap: Record<number, string> = {
    0: 'Playing',
    1: 'Streaming',
    2: 'Listening to',
    3: 'Watching',
    4: 'Custom Status:',
    5: 'Competing in',
  };

  const activityType = activityTypeMap[activity.type] || 'Using';

  const codeNames = ['Visual Studio Code', 'VS Code', 'Visual Studio', 'WebStorm', 'Code', 'Cursor', 'IntelliJ IDEA', 'PhpStorm', 'PyCharm', 'Rider', 'Vim', 'Sublime Text', 'Atom', 'Notepad++'];
  const isCoding = codeNames.some(name => 
    activity.name?.toLowerCase().includes(name.toLowerCase()) ||
    activity.details?.toLowerCase().includes(name.toLowerCase()) ||
    activity.state?.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="p-3 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-600/70 shadow-md relative overflow-hidden">
      <div className="flex items-start relative z-10">
        <div className="flex-shrink-0 mr-3">
          {activityIcon ? (
            <img src={activityIcon} alt={activity.name} className="w-16 h-16 rounded object-cover" />
          ) : (
            <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              {activity.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="font-semibold text-black drop-shadow-sm">
            {isCoding ? '💻 Coding in' : activityType} {activity.name}
          </div>
          
          {isCoding && activity.details && (
            <div className="text-sm text-gray-700 italic mt-1">
              📄 {activity.details}
            </div>
          )}
          
          {activity.state && (
            <div className="text-sm text-gray-700 italic">
              {activity.state}
            </div>
          )}

          {activity.details && !isCoding && (
            <div className="text-sm text-gray-700 italic">
              {activity.details}
            </div>
          )}
          
          {activity.timestamps?.start && (
            <div className="text-xs text-gray-600 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              ⏱️ {elapsed}
            </div>
          )}

          {activity.assets?.small_image && (
            <div className="mt-2 flex items-center">
              <img 
                src={getSmallImageUrl(activity.assets.small_image, activity.application_id)} 
                alt="Icon" 
                className="w-4 h-4 rounded-full mr-1"
              />
              <span className="text-xs text-gray-600">{activity.assets.small_text || ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getSmallImageUrl(smallImage: string, appId?: string): string {
  if (smallImage.startsWith('mp:external/')) {
    const match = smallImage.match(/https\/(.*)/i);
    if (match?.[1]) {
      return `https://${match[1]}`;
    }
    return '';
  }
  
  if (!smallImage.startsWith('http')) {
    return `https://cdn.discordapp.com/app-assets/${appId}/${smallImage}.png`;
  }
  
  return smallImage;
}