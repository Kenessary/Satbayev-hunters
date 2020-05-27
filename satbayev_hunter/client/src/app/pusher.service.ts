import { Injectable } from '@angular/core';
declare const Pusher: any;

@Injectable()
export class PusherService {
  constructor() {
    const pusher = new Pusher('bfbf8e0c603972252b73', {
      cluster: 'ap2',
    });
    this.channel = pusher.subscribe('vote-channel');
  }
  channel;
  public init() {
    return this.channel;
  }
}