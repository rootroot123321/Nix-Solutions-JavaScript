import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
    return (
        <ContentLoader
            speed={2}
            width={272}
            height={590}
            viewBox="0 0 272 590"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="451" rx="6" ry="6" width="280" height="84" />
            <rect x="8" y="552" rx="6" ry="6" width="91" height="31" />
            <rect x="129" y="544" rx="25" ry="25" width="140" height="46" />
            <rect x="4" y="0" rx="0" ry="0" width="260" height="390" />
            <rect x="9" y="404" rx="0" ry="0" width="249" height="33" />
        </ContentLoader>
    );
}

export default LoadingBlock;
