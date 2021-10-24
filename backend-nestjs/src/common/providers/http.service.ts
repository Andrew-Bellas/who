import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch'

@Injectable()
export class HttpService {
    public async fetchJson(route: string, params?: any) : Promise<any> {
        return (await fetch(route, params)).json()
    }
}