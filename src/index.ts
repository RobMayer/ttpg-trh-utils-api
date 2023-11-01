import { GameObject, GameWorld, JSConsole, world } from "@tabletop-playground/api";
import { CrossRef } from "ttpg-common-lib";

export namespace Jukebox {
    export type Events = {
        started: [GameObject, string, number];
        paused: [GameObject, string, number, number];
        endOfSong: [GameObject, string];
        endOfPlay: [GameObject, string];
    };

    export type MediaEntry =
        | {
              url: string;
          }
        | {
              file: string;
              package: string;
          };

    export type Controls = {
        play: () => void;
        stop: () => void;
        pause: () => void;
        next: () => void;
        prev: () => void;
        scrub: (position: number) => void;
        setRepeat: (mode: "ONE" | "NONE" | "ALL") => void;
        setShuffle: (value: boolean) => void;
        dequeue: (...idx: number[]) => void;
        enqueue: (...items: MediaEntry[]) => number;
        clearPlaylist: () => void;
        loadPlaylist: (nane: string) => boolean;
        volume: (n: number) => void;
    };

    export const controls = (obj: GameObject): undefined | Controls => {
        if (obj.isValid()) {
            return CrossRef.get<Controls>("@ThatRobHuman/utilties/jukebox", obj.getId());
        }
        return;
    };
}

export namespace Controller {
    export type Events = {
        analog: [GameObject, string, number, number];
        touch: [GameObject, string, number];
        toggle: [GameObject, string, number, boolean];
        initialize: [GameObject, string, number[], boolean[]];
    };
}

export namespace Timer {
    export type Events = {
        elapsed: [GameObject];
    };
}

export namespace Hourglass {
    export type Events = {
        elapsed: [GameObject];
    };
}
