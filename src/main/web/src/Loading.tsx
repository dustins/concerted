import React, { ReactNode } from 'react';
import LoadingComponentProps = LoadableExport.LoadingComponentProps;

const Loading = (props: LoadingComponentProps & { children?: ReactNode }, context?: any): any => {
    if (props.error) {
        // When the loader has errored
        return <div>Error!</div>;
    } else if (props.timedOut) {
        // When the loader has taken longer than the timeout
        return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
        // When the loader has taken longer than the delay
        return <div>Loading...</div>;
    } else {
        // When the loader has just started
        return null;
    }
};

export default Loading;