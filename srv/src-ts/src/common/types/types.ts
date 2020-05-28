import { ServiceImpl, Service, EventMessage, EventHandler, Request as StandardRequest } from '@sap/cds/apis/services';
import { Definition } from '@sap/cds-reflect/apis/csn';
import { Query } from '@sap/cds/apis/ql';

export type UUID = String;

export type CdsService = { [name: string]: Service };

export interface ServeOption {
    name: string;
    impl: ServiceImpl;
}

//Have to define own request because declared in @sap/cds/apis/services
//doesn't have major part of attributes
//fields and methods are taken from https://github.wdf.sap.corp/pages/cap/node.js/api#cds-requests
export type Request = StandardRequest | CustomRequest;

interface User {
    id: string;
    locale: string;
    is(role: string): boolean;
    has(roles: string[]): boolean;
    [attr: string]: any;
}

interface CustomRequest extends EventMessage {
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
    target: Definition;
    query: Query;
    params: any;
    user: User;
    reply(data: any): void;
    info(code?: number, msg?: string, target?: Definition): void;
    error(code?: number, msg?: string, target?: Definition): void;
    reject(code?: number, msg?: string, target?: Definition): void;
    on(Event: string, EventHandler: EventHandler): void;
}