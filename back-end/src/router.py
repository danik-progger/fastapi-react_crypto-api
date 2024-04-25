from fastapi import APIRouter
from src.http_client import cmc_client

router = APIRouter(
    prefix="/currencies"
)


@router.get("")
async def get_all_currencies():
    return await cmc_client.get_listings()


@router.get("/{currency_id}")
async def get_currency_by_id(currency_id: int):
    return await cmc_client.get_currency(currency_id)
