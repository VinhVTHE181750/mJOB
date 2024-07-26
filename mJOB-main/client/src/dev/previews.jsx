import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Post from "../components/forum/Post.jsx";
import CommentCount from "../components/forum/micro/CommentCount.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Post">
                <Post/>
            </ComponentPreview>
            <ComponentPreview path="/CommentCount">
                <CommentCount/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews