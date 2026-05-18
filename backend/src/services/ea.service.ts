import axios from 'axios';

export class EaProClubsService {
  private baseUrl = 'https://proclubs.ea.com/api/fc/clubs/matches';

  async obtenerPartidos(clubId: string) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          clubIds: clubId,
          matchType: 'friendlyMatch',
          platform: 'common-gen5',
          maxResultCount: 12,
        },
        headers: {
          'User-Agent': 'Mozilla/5.0...',
          'Accept': 'application/json',
          'Referer': 'https://www.ea.com/',
        },
        timeout: 20000,
      });

      return {
        matchType: 'friendlyMatch',
        matches: Array.isArray(response.data) ? response.data : [],
      };
    } catch (error) {
      console.error('EA API Error:', error);
      return { matchType: 'friendlyMatch', matches: [] };
    }
  }
}