"use client";

import { useEffect, useRef, useState } from 'react';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  global_name?: string;
  display_name?: string;
}

interface DiscordActivity {
  name: string;
  type: number;
  details?: string;
  state?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
}

interface DiscordData {
  discord_user: DiscordUser;
  discord_status: string;
  activities: DiscordActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
}

interface PresenceData {
  d?: DiscordData | { [key: string]: DiscordData };
  success?: boolean;
  data?: DiscordData;
  t?: string;
}

export default function DiscordProfile({ userId = '719831189585657877' }: { userId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DiscordData | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Helper functions moved outside useEffect
  const formatElapsedTime = (startTimestamp: number): string => {
    const now = Date.now();
    let elapsed = Math.floor((now - startTimestamp) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatSongTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (activity: DiscordActivity): string | null => {
    if (activity.assets && activity.assets.large_image) {
      let imageUrl = activity.assets.large_image;
      
      if (imageUrl.startsWith('spotify:')) {
        const spotifyId = imageUrl.replace('spotify:', '');
        return `https://i.scdn.co/image/${spotifyId}`;
      }
      
      if (imageUrl.startsWith('mp:external/')) {
        const match = imageUrl.match(/https\/(.*)/i);
        if (match && match[1]) {
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

  const getUserAvatar = (data: DiscordData): string | null => {
    if (data.discord_user && data.discord_user.avatar) {
      const avatarId = data.discord_user.avatar;
      const userId = data.discord_user.id;
      const format = avatarId.startsWith('a_') ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.${format}?size=128`;
    }
    return null;
  };

  // Update time every second for live timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let hasReceivedData = false;
    let lastValidData: DiscordData | null = null;
    let socket: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 3;

    // Helper functions
    const formatElapsedTime = (startTimestamp: number): string => {
      const now = Date.now();
      let elapsed = Math.floor((now - startTimestamp) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const formatSongTime = (ms: number): string => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getActivityIcon = (activity: DiscordActivity): string | null => {
      if (activity.assets && activity.assets.large_image) {
        let imageUrl = activity.assets.large_image;
        
        if (imageUrl.startsWith('spotify:')) {
          const spotifyId = imageUrl.replace('spotify:', '');
          return `https://i.scdn.co/image/${spotifyId}`;
        }
        
        if (imageUrl.startsWith('mp:external/')) {
          const match = imageUrl.match(/https\/(.*)/i);
          if (match && match[1]) {
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

    const getUserAvatar = (data: DiscordData): string | null => {
      if (data.discord_user && data.discord_user.avatar) {
        const avatarId = data.discord_user.avatar;
        const userId = data.discord_user.id;
        const format = avatarId.startsWith('a_') ? 'gif' : 'png';
        return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.${format}?size=128`;
      }
      return null;
    };

    const updatePresenceUI = (presenceData: DiscordData) => {
      if (!presenceData || !containerRef.current) return;
      
      hasReceivedData = true;
      lastValidData = presenceData;
      setData(presenceData);
      setLoading(false);
      setError(null);

      try {
        localStorage.setItem('discord_presence_data', JSON.stringify({
          timestamp: Date.now(),
          data: presenceData
        }));
      } catch (e) {
        console.warn('Failed to cache Discord presence data:', e);
      }
    };

    const showErrorState = (errorMessage: string) => {
      if (!containerRef.current) return;
      
      setError(errorMessage || "Error connecting to Lanyard");
      setLoading(false);
      setData(null);
    };

    // Try to load cached data
    try {
      const cachedData = localStorage.getItem('discord_presence_data');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        const timestamp = parsed.timestamp;
        const data = parsed.data;
        
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        if (timestamp > oneHourAgo && data) {
          console.log('Using cached Discord presence data');
          lastValidData = data;
          updatePresenceUI(data);
        }
      }
    } catch (e) {
      console.warn('Failed to load cached Discord presence data:', e);
    }

    const connectWebSocket = () => {
      if (retryCount >= maxRetries) {
        showErrorState("Max retries reached. Please check if your Discord ID is correct and privacy settings allow data sharing.");
        return;
      }

      retryCount++;
      console.log(`Connecting to Lanyard API (attempt ${retryCount}/${maxRetries})`);

      // Initialize WebSocket connection
      socket = new WebSocket('wss://api.lanyard.rest/socket');
      
      const dataTimeout = setTimeout(() => {
        if (!hasReceivedData) {
          if (lastValidData) {
            updatePresenceUI(lastValidData);
          } else {
            // Try REST API as fallback
            fetchInitialData();
          }
        }
      }, 8000); // Reduced timeout

      socket.addEventListener('open', () => {
        console.log('WebSocket connected');
        socket?.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_ids: [userId] },
        }));

        heartbeatInterval = setInterval(() => {
          socket?.send(JSON.stringify({ op: 3 }));
        }, 30000);
      });

      socket.addEventListener('message', (event) => {
        const message: PresenceData = JSON.parse(event.data);

        if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
          clearTimeout(dataTimeout);
          
          if (message.d && (message.d as { [key: string]: DiscordData })[userId]) {
            updatePresenceUI((message.d as { [key: string]: DiscordData })[userId]);
          } else if (message.d && !(message.d as { [key: string]: DiscordData })[userId]) {
            updatePresenceUI(message.d as DiscordData);
          } else if (lastValidData) {
            updatePresenceUI(lastValidData);
          }
        }
      });

      socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        clearTimeout(dataTimeout);
        if (lastValidData) {
          console.warn("WebSocket error, but using cached data");
          updatePresenceUI(lastValidData);
        } else if (retryCount < maxRetries) {
          setTimeout(connectWebSocket, 2000 * retryCount); // Exponential backoff
        } else {
          showErrorState("WebSocket connection failed. Please check your Discord privacy settings.");
        }
        if (heartbeatInterval) clearInterval(heartbeatInterval);
      });

      socket.addEventListener('close', () => {
        console.log('WebSocket closed');
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        if (!hasReceivedData && retryCount < maxRetries) {
          setTimeout(connectWebSocket, 2000 * retryCount);
        }
      });
    };

    // Fetch initial data from REST API as fallback
    const fetchInitialData = async () => {
      try {
        console.log('Fetching initial data from REST API');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          signal: controller.signal,
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('REST API response:', result);
        
        if (result.success) {
          hasReceivedData = true;
          updatePresenceUI(result.data);
        } else {
          throw new Error('API returned success: false');
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        if (retryCount >= maxRetries) {
          showErrorState(`Failed to fetch Discord data: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure your Discord ID (${userId}) is correct and your Discord privacy settings allow data sharing.`);
        }
      }
    };
    
    // Start connection
    connectWebSocket();

    // Cleanup
    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (socket) socket.close();
    };
  }, [userId]);

  // Render loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl w-[440px] shadow-xl overflow-hidden text-gray-800 flex-shrink-0 self-start border border-gray-200">
        <div className="relative">
          <div className="h-28 bg-cover bg-center" style={{ backgroundImage: 'url(https://dcdn.dstn.to/banners/719831189585657877)' }}></div>
          <div className="p-6 border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-4xl mr-6 border-4 border-white -mt-16 shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600">M</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-3xl font-extrabold text-black">MickP</div>
                <div className="text-lg text-gray-500 font-medium">Coding in VSCode</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium text-gray-700">Currently working on projects</span>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl w-[440px] shadow-xl overflow-hidden text-gray-800 flex-shrink-0 self-start border border-gray-200">
        <div className="relative">
          <div className="h-28 bg-cover bg-center" style={{ backgroundImage: 'url(https://dcdn.dstn.to/banners/719831189585657877)' }}></div>
          <div className="p-6 border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-2xl mr-4 border-4 border-white -mt-12 shadow-lg">
                !
              </div>
              <div className="mt-2">
                <div className="text-xl font-semibold text-black flex items-center">
                  Error<span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-sm rounded">Connection Failed</span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-500 mr-2"></div>
                  {error}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>Could not connect to Discord presence service.</p>
          <button 
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render success state
  if (!data) return null;

  const avatarUrl = data.discord_user.avatar ? 
    `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128` : 
    null;
  const username = data.discord_user.username || 'User';
  const globalName = data.discord_user.global_name || null;
  const displayName = data.discord_user.display_name || globalName || username;
  const discriminator = data.discord_user.discriminator ? `#${data.discord_user.discriminator}` : '';
  const status = data.discord_status || 'offline';

  return (
    <div ref={containerRef} className="bg-white rounded-2xl w-[440px] shadow-xl overflow-hidden text-gray-800 flex-shrink-0 self-start border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <div className="h-28 bg-cover bg-center" style={{ backgroundImage: 'url(https://dcdn.dstn.to/banners/719831189585657877)' }}></div>
        <div className="p-6 border-b border-gray-200 pb-8">
          <div className="flex items-center">
            <div className="relative w-28 h-28 mr-6 -mt-16">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-300 shadow-lg flex items-center justify-center text-white font-bold text-4xl">
                {avatarUrl ? 
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" /> : 
                  displayName.charAt(0)
                }
              </div>
              <span className={`absolute -bottom-1 right-2 w-7 h-7 rounded-full border-4 border-white ${
                status === 'online' ? 'bg-green-500' :
                status === 'idle' ? 'bg-yellow-400' :
                status === 'dnd' ? 'bg-red-500' :
                'bg-gray-500'
              }`}></span>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-extrabold text-black">
                {displayName}
                <span className="text-gray-500 text-lg font-medium ml-2">({username}{discriminator !== '#0' ? discriminator : ''})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spotify Activity */}
      {data.listening_to_spotify && data.spotify && (
        <div className="p-4 hover:bg-gray-50 transition-all duration-200 border-t border-gray-200 relative overflow-hidden">
          <div className="flex items-start relative z-10">
            <div className="flex-shrink-0 mr-4">
              {data.spotify.album_art_url ? 
                <img src={data.spotify.album_art_url} alt="Album Art" className="w-20 h-20 rounded-xl object-cover shadow-lg" /> : 
                <div className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
              }
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <svg className="w-5 h-5 text-green-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <div className="text-lg font-bold text-black">Listening to Spotify</div>
              </div>
              <div className="text-base text-gray-800 font-medium mb-1">{data.spotify.song}</div>
              <div className="text-sm text-gray-600 mb-1">by {data.spotify.artist}</div>
              <div className="text-sm text-gray-500 mb-2">on {data.spotify.album}</div>
              {data.spotify.timestamps && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatSongTime(currentTime - data.spotify.timestamps.start)}</span>
                  <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ 
                        width: `${((currentTime - data.spotify.timestamps.start) / (data.spotify.timestamps.end - data.spotify.timestamps.start)) * 100}%` 
                      }}
                    />
                  </div>
                  <span>{formatSongTime(data.spotify.timestamps.end - data.spotify.timestamps.start)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Other Activities */}
      {data.activities.filter(a => a.name !== 'Spotify' && a.type !== 4).map((activity, idx) => (
        <div key={idx} className="p-4 hover:bg-gray-50 transition-all duration-200 border-t border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {getActivityIcon(activity) ? 
                <img src={getActivityIcon(activity)!} alt={activity.name} className="w-20 h-20 rounded-xl object-cover shadow-lg" /> : 
                <div className="w-20 h-20 bg-gray-400 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {activity.name.charAt(0).toUpperCase()}
                </div>
              }
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-black mb-1">Playing {activity.name}</div>
              {activity.details && <div className="text-base text-gray-800 font-medium mb-1">{activity.details}</div>}
              {activity.state && <div className="text-sm text-gray-600">{activity.state}</div>}
              {activity.timestamps?.start && (
                <div className="text-xs text-gray-500 mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {formatElapsedTime(activity.timestamps.start)}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {!data.listening_to_spotify && data.activities.filter(a => a.name !== 'Spotify' && a.type !== 4).length === 0 && (
        <div className="p-6 text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-600">No activities right now</p>
        </div>
      )}
    </div>
  );
}