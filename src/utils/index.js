import toast from 'react-hot-toast'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

export const formateResponse = (response, message) => {
    const { data, error } = response
    if (error) toast.error(message);
    return data;
}

export const HTMLValueToDraft = (html) => {
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
}

export const draftValueToHTML = (draft) => {
    return draftToHtml(convertToRaw(draft.getCurrentContent()));
}