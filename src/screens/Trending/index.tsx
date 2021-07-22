/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  Text,
} from 'react-native';

import search from '../../assets/icons/search.png';
import MovieCard from '../../components/MovieCard';
import { getTrendingMovies, Movie, getGenres, Genre } from '../../services/api';
import * as S from './styles';

const Trending: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchMovies = async () => {
    const { data } = await getTrendingMovies();
    setMovies(data.results);
    const { data: result } = await getGenres();
    setGenres(result.genres);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => {
      return (
        <View style={{ marginBottom: index + 1 === movies.length ? 8 : 0 }}>
          <MovieCard
            isFirst={index === 0}
            image={item.poster_path ?? ''}
            title={item.title}
            year={item.release_date.split('-')[0]}
          />
        </View>
      );
    },
    [],
  );

  return (
    <S.Container>
      <SafeAreaView />
      <S.Header>
        <S.Title>Top Movies</S.Title>
        <TouchableOpacity>
          <S.Search source={search} />
        </TouchableOpacity>
      </S.Header>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </S.Container>
  );
};

export default Trending;
