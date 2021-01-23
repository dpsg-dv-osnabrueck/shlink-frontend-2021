import axios from 'axios';
import ROUTE from '@/data/routes';

const apiClient = axios.create({
  baseURL: ROUTE.SHLINK.BASE,
});

export default {
  get() {
    return apiClient.get(
      `${ROUTE.SHLINK.SHORT_URLS}?orderBy=dateCreated-DESC`,
      {
        headers: {
          'X-Api-Key': process.env.VUE_APP_API_KEY,
        },
      },
    );
  },

  create(payload) {
    const newUrl = {
      longUrl: payload.longUrl,
      tags: [payload.longUrl],
      customSlug: payload.customSlug,
      findIfExists: true,
      shortCodeLength: 4,
      validateUrl: true,
    };

    return apiClient.post(`${ROUTE.SHLINK.SHORT_URLS}`, newUrl, {
      headers: {
        'X-Api-Key': process.env.VUE_APP_API_KEY,
      },
    });
  },

  delete(shortCode) {
    return apiClient.delete(`${ROUTE.SHLINK.SHORT_URLS}/${shortCode}`, {
      headers: {
        'X-Api-Key': process.env.VUE_APP_API_KEY,
      },
    });
  },
};
