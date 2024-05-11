import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable()
export abstract class ClientService {

	private readonly baseUrl!: string

	constructor(private readonly _httpClient: HttpClient) {
		this.baseUrl = "http://www.omdbapi.com/?apikey=1f43cc69&";
	}

	private buildUrl(path: string): string {
		return this.baseUrl.concat(path)
	}

	get(path: string, options?: any): any {
		return this._httpClient.get(this.buildUrl(path), options)
	}
}