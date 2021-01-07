import { call, takeLatest, put } from 'redux-saga/effects'
import Api from '../../api'

import { getAlbums, getAlbumsDone } from '../slices/albums'

// **fetch all
function* fetchAlbums() {
  const { response, error } = yield call(() => Api.fetchAlbums())

  if (response) {
    yield put(getAlbumsDone(response.data))
    // yield put({ type: 'FETCH_ALBUMS_DONE', result: response.data })
  } else {
    yield put({ type: 'SHOW_HTTP_ERROR_DIALOG', error })
  }
}
// fetch all**

export default function* albums() {
  yield takeLatest(getAlbums.name, fetchAlbums)
}
