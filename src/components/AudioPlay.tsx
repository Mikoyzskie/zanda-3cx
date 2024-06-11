import React from 'react'
import { Howl, Howler } from 'howler';

export default function AudioPlay({ src }: { src: string }) {

    const sound = new Howl({
        src: [src]
    });

    // Change global volume.
    Howler.volume(0.5);

    return (
        <span onClick={() => {

            sound.play()
        }}>
            Listen
        </span>
    )
}
