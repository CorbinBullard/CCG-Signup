/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// device.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DevicesService } from 'src/devices/devices.service';
import { MobileService } from 'src/mobile/mobile.service';

@WebSocketGateway({ namespace: 'device-registration', cors: { origin: '*' } })
export class DeviceGateway {
  @WebSocketServer()
  server: Server;

  constructor(private deviceService: DevicesService) {}

  @SubscribeMessage('register-device')
  async handleDeviceRegistration(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { token: number; uniqueKey: string },
  ) {
    const { token, uniqueKey } = payload;
    console.log(token, uniqueKey);
    const device = await this.deviceService.verifyTokenAndRegister(
      token,
      uniqueKey,
    );
    if (device) {
      this.server.emit('device-registered', { deviceId: device.id });
    } else {
      client.emit('error', {
        message: 'Invalid token or device registration failed',
      });
    }
  }

  handleConnection(client: Socket) {
    console.log('CONNECT');
    const { token } = client.handshake.query;
    if (token) client.join(token.toString());
  }
}
