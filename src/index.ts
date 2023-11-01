import { GameObject, GameWorld, JSConsole, world } from "@tabletop-playground/api";
import { CrossRef } from "ttpg-common-lib";

export namespace Jukebox {
    export type Events = {
        started: [jukebox: GameObject, song: MediaEntry];
        paused: [jukebox: GameObject, song: MediaEntry, elapsed: number, remaining: number];
        stopped: [jukebox: GameObject];
        endOfSong: [jukebox: GameObject, song: MediaEntry, next: MediaEntry | null];
        endOfPlay: [jukebox: GameObject, song: MediaEntry];
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
        analog: [controller: GameObject, channel: number, value: number];
        touch: [controller: GameObject, channel: number];
        toggle: [controller: GameObject, channel: number, state: boolean];
        initialize: [controller: GameObject, analogs: number[], toggles: boolean[]];
    };
}

export namespace Timer {
    export type Events = {
        elapsed: [timer: GameObject];
    };
}

export namespace Hourglass {
    export type Events = {
        elapsed: [timer: GameObject];
    };
}
