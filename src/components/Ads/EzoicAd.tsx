import { useEffect } from 'react';
import { Container } from '@mantine/core';

declare global {
    interface Window {
        ezstandalone: {
            cmd: Array<() => void>;
            showAds: (id: number) => void;
        };
    }
}

const EzoicAd = () => {
    useEffect(() => {
        if (window.ezstandalone && window.ezstandalone.cmd) {
            window.ezstandalone.cmd.push(function () {
                window.ezstandalone.showAds(109);
            });
        }
    }, []);

    return (
        <Container size="xl" mt="62px">
            <div id="ezoic-pub-ad-placeholder-109"></div>
        </Container>
    );
};

export default EzoicAd;
