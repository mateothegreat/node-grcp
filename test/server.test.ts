import { ServerUnaryCall } from '@grpc/grpc-js';
import { GRPCServer } from '../src/GRPCServer';
import { RPCCallRequest, RPCCallResponse } from './messaging';

const successful = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>) => {
    console.log(`requested: ${ JSON.stringify(call.request) }`);
    return {
        result: true,
        message: 'asdf',
        payload: {
            taco: 'bell'
        }
    };
};

const errors = (call: ServerUnaryCall<RPCCallRequest, RPCCallResponse>) => {
    console.log(`requested: ${ JSON.stringify(call.request) }`);
    throw new Error('this failed');
    
    return {
        result: true,
        message: 'asdf',
        payload: {
            taco: 'bell'
        }
    };
};

const server = new GRPCServer();

server.start('localhost:6666', 'test/proto/test.proto');

server.register('test', 'svc', {
    successful: successful,
    errors: errors
});
