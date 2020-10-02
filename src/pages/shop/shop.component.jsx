import React from 'react';

import SHOP_DATA from './shop.data'

import CollectionPreview from '../../componets/collection-preview/collection-preview.component'


class ShpePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections : SHOP_DATA
        }
    }

    render(){
        
        const {collections}= this.state;

        return (
              
            <div>
                {
                    collections.map(({id, ...otherCollectionProps }) =>(
                        <CollectionPreview key={id}{...otherCollectionProps} />
                    ))
                }
            </div>
            )
    }
}

export default ShpePage