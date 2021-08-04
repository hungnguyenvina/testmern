import {combineReducers} from 'redux';
import { UserReducer } from './userReducer';
import {CourseCategoryReducer} from './courseCategoryReducer';
import {CourseReducer} from './courseReducer';
import { reducer as jPlayers } from 'react-jplayer';

// Styles the jPlayer to look nice
import 'react-jplayer/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import 'react-jplayer/src/less/controls/iconControls.less';

import VideoPlayer from '../../../src/components/Jplayer/videoPlayer';
import { CartReducer } from './cartReducer';

export const reducer = combineReducers(
    {
        couse_categories_reducer: CourseCategoryReducer,
        course_reducer: CourseReducer,
        users : UserReducer,
        carts: CartReducer,
        jPlayers
    }
)