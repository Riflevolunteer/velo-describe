import React from 'react';
import config from '../config';
import ScreenContainer from '../components/ScreenContainer';
import ListRow from '../components/ListRow';
import FetchState from '../components/FetchState';
import useFetchJson from '../hooks/useFetchJson';

const CategoriesScreen = ({ navigation }) => {
    const { serverURL } = config
    const { data: categories, loading, error } = useFetchJson(`${serverURL}/categories`)
    const sortedCategories = categories && [...categories].sort((a,b) => a.title > b.title && 1 || -1)

    return (
      <ScreenContainer>
        <FetchState loading={loading} error={error} />
        {
          sortedCategories && sortedCategories.map(x =>
            <ListRow key={x.title} title={x.title} onPress={() => navigation.navigate('Brands', {name: x.title, id: x.category_id})}/>
          )
        }
      </ScreenContainer>
    )
  }

  export default CategoriesScreen
