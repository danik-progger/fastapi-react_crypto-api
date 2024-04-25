from aiohttp import ClientSession
from async_lru import alru_cache
from src.config import settings


class HttpClient:
    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                'X-CMC_PRO_API_KEY': api_key
            })


class CMC_HttpClient(HttpClient):
    @alru_cache(maxsize=100)
    async def get_listings(self):
        async with self._session.get('/v1/cryptocurrency/listings/latest') as response:
            listings = await response.json()
            return listings["data"]

    @alru_cache(maxsize=100)
    async def get_currency(self, currency_id: int):
        async with self._session.get(
            '/v2/cryptocurrency/quotes/latest',
            params={'id': currency_id}
        ) as response:
            currency = await response.json()
            return currency["data"][str(currency_id)]


cmc_client = CMC_HttpClient(
    base_url="https://pro-api.coinmarketcap.com",
    api_key=settings.CMC_API_KEY
)
