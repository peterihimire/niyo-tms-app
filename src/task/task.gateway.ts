import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust this according to your CORS policy
  },
})
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    void server;
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    void args;
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitTaskCreated(task: any) {
    this.server.emit('taskCreated', task);
  }

  emitTaskUpdated(task: any) {
    this.server.emit('taskUpdated', task);
  }

  emitTaskDeleted(taskId: string) {
    this.server.emit('taskDeleted', taskId);
  }
}
