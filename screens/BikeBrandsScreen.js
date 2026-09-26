import React from 'react';
import config from '../config';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const BikeBrandsScreen = ({ navigation }) => {
    const { serverURL } = config
    const { data: brands, loading, error } = useFetchJson(`${serverURL}/bikeBrands`)

    return (
      <ScreenContainer>
        <FetchState loading={loading} error={error} />
        {
          brands && brands.map(x =>
            <ListRow key={x.brand_id} title={x.title} onPress={() => navigation.navigate('Bikes', {name: x.title, brand_id: x.brand_id})}/>
          )
        }
      </ScreenContainer>
    )
  }

  export default BikeBrandsScreen
