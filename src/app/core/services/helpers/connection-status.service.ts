import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {

  online$ = fromEvent(window, 'online');
  offline$ = fromEvent(window, 'offline');
  connectionStatus = new EventEmitter<boolean>();

  constructor(
    private toast: ToastrService,
  ) {
    this.subscribeForStatus();
  }
  /**
   * Returns true if a device is online
   */
  get isOnline() {
    return !!window.navigator.onLine;
  }
  private subscribeForStatus() {
    let notifcation;
    this.online$.subscribe(e => {
      if (notifcation !== undefined && notifcation !== null) { notifcation.remove(); }
      this.toast.info('', 'Internet connection restored');
      this.connectionStatus.emit(true);
    });
    this.offline$.subscribe(e => {
      // tslint:disable-next-line:max-line-length
      notifcation = this.toast.warning('', 'You are currently offline. Please check your internet connection');
      this.connectionStatus.emit(false);
    });
  }
}
