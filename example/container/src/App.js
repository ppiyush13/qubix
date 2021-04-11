import React from 'react';
import { Box, FlexBox } from 'react-styled-flex';
import qubix from 'qubix';
import { version as reactScriptsVersion } from 'react-scripts/package.json';

/**
 * Load micro-frontend
 */
const MicroFrontEnd = React.lazy(() => qubix.load('micro-frontend'));

export default function App() {
    return (
        <Box padding={'1rem'} border={'1px dashed blue'}>
            <FlexBox justifyContent={'space-between'} alignItems={'center'}>
                <h1>Container App</h1>
                <span>react-scripts: {reactScriptsVersion}</span>
            </FlexBox>
            <Box padding={'1rem 0'}>
                <React.Suspense fallback={'...Loading'}>
                    <MicroFrontEnd/>
                </React.Suspense>
            </Box>
        </Box>
    );
}

