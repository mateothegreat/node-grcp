import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export class GRPCClient<T> {
    public client: T;

    public constructor(path: string, host: string, pkg: string, service: string) {
        const grpcObj = protoLoader.loadSync(path, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const packageDefinition = grpc.loadPackageDefinition(grpcObj);
        this.client = new packageDefinition[pkg][service](host, grpc.credentials.createInsecure());
    }

    public call(fn: string, params: any): any {
        return new Promise((resolve, reject) => {
            this.client[fn](params, (err, res) => {
                resolve(res);
            });
        });
    }
}
