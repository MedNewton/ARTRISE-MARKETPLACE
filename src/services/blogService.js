import db from "../firebase"
import {ref, onValue} from "firebase/database";
import img1 from '../assets/images/blog/thumb-1.jpg'

const blogs = ref(db, 'blogs/')



