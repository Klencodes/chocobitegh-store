import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantValueService } from './constant-values.service';
import { NetworkErrorHandlerService } from './network-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  headers;
  headersForFormData;
  headersNoToken;
  options;
  optionsForFormData;
  optionsNoToken;

  constructor(
    private http: HttpClient,
    private constantValues: ConstantValueService,
    private handleNetworkErrorsService: NetworkErrorHandlerService
  ) {
    this.headers = new HttpHeaders()
    this.headersNoToken = new HttpHeaders();
    this.headersForFormData = new HttpHeaders();
    this.headers = this.headers.set('Authorization', 'Token');
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headersNoToken = this.headersNoToken.set('Content-Type', 'application/json');
    this.headersForFormData = this.headersForFormData.append('Authorization', 'Token');
    this.options = { headers: this.headers };
    this.optionsForFormData = { headers: this.headersForFormData };
    this.optionsNoToken = { headers: this.headersNoToken };
  }
  /**
 * HTTP POST request to submit data
 * @param endPoint Endpoint
 * @param resource Request Payload
 */
  postNoToken(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValues.BASE_URL + endPoint, JSON.stringify(resource), this.optionsNoToken)
    .pipe(
      catchError(this.handleNetworkErrorsService.handleError),
      map((response) => response)
    );
  }
  /**
 * HTTP GET request to fetch data
 * @param endPoint Endpoint
 */
  getDataNoToken(endPoint: string): Observable<any> {
    return this.http.get(this.constantValues.BASE_URL + endPoint, this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
 * HTTP GET request to fetch data
 * @param endPoint Endpoint
 */
  getData(endPoint: string): Observable<any> {
    return this.http.get(this.constantValues.BASE_URL + endPoint, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

  /**
   * HTTP POST request to submit data
   * @param endPoint Endpoint
   * @param resource Request Payload
   */
  postData(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValues.BASE_URL + endPoint, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP POST request to submit data
   * @param endPoint Endpoint
   * @param resource Request Payload
   */
   updateData(endPoint: string, resource?: any): Observable<any> {
    return this.http.put(this.constantValues.BASE_URL + endPoint, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

  /**
   * HTTP DELETE request to delete data
   * @param endPoint Endpoint
   */
   deleteData(endPoint: string): Observable<any> {
    return this.http.delete(this.constantValues.BASE_URL + endPoint, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
 * HTTP POST to create record with FormData payload
 * @param endPoint Endpoint
 * @param resource FormData Request Payload
 */
  postFormData(endPoint: string, resource?: FormData): Observable<any> {
    return this.http.post(this.constantValues.BASE_URL + endPoint, resource, this.optionsForFormData)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

  /**
     * HTTP PUT to update data with FormData payload
     * @param endPoint Endpoint
     * @param resource FormData Request Payload
     */
  updateFormData(endPoint: string, resource?: FormData): Observable<any> {
    return this.http.put(this.constantValues.BASE_URL + endPoint, resource, this.optionsForFormData)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
  * HTTP GET request to fetch data locally
  * @param endPoint Endpoint
  * @param jsonResource Request Payload
  */
  getLocalData<T>(endPoint: string): Observable<T> | Observable<any> {
    return this.http.get<T>(endPoint)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

  /**
 * HTTP GET request to fetch data
 * @param endPoint Endpoint
 */
  httpGetAll(endPoint: string): Observable<any> {
    return this.http.get(this.constantValues.BASE_URL + endPoint, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP GET request to fetch data
   * @param url URL
   */
  httpGetNextPage(url: string): Observable<any> {
    return this.http.get(url, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP POST request to fetch data
   * @param url URL
   * @param resource request payload. OPTIONAL
   */
  httpPostNextPage(url: string, resource?: any): Observable<any> {
    return this.http.post(url, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

}
