import {Location} from "history";

interface ILocation {
    page: Location<unknown>;
    from?: string;
    order?:number;
    status?:string;
}

export interface ILocationState {
    state?: ILocation
}