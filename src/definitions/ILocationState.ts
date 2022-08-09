import {Location} from "history";

interface ILocation {
    page: Location<unknown>;
    from?: string;
}

export interface ILocationState {
    state?: ILocation
}