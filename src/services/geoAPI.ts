import axios from "axios";
import type { GeoNamesResponse } from "../types";
import { API_CONFIG } from "../utils/constants";

const USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

class GeoAPIService {
  private baseURL = API_CONFIG.GEONAMES_BASE_URL;

  /**
   * Search for cities by name
   */
  async searchCities(
    query: string
  ): Promise<Array<{ name: string; country?: string }>> {
    try {
      if (!query || query.length < 2) {
        return [];
      }

      const response = await axios.get<GeoNamesResponse>(
        `${this.baseURL}/searchJSON`,
        {
          params: {
            q: query,
            maxRows: 10,
            username: USERNAME,
            featureClass: "P", // Cities, villages, etc.
            orderby: "population",
          },
        }
      );

      if (!response.data || !response.data.geonames) {
        return [];
      }

      return response.data.geonames.map((city) => ({
        name: city.name,
        country: city.countryName,
      }));
    } catch (error) {
      console.error("Failed to search cities:", error);
      return [];
    }
  }
}

export const geoAPI = new GeoAPIService();
