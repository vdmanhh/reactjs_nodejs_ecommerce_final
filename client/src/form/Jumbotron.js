import React from 'react';
import Typewriter from 'typewriter-effect';

const Jumbotron=({textt})=> {
    return (
        <Typewriter
            options ={{
                strings: textt,
                autoStart: true,
                loop: true,
            }}>
        </Typewriter>
    );
}

export default Jumbotron;