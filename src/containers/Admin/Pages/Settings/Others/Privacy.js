/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Axios from '../../../../../axiosIns';
import Toast from '../../../../../components/UI/Toast/Toast';

function Privacy() {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [privacy, setPrivacy] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'This is sample text' }],
        },
    ]);

    useEffect(() => {
        const url = '/privacy';
        Axios.get(url)
            .then((res) => {
                const { value } = res.data[0];
                setPrivacy([JSON.parse(value)]);
            })
            .catch((err) => {
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const saveHandler = () => {
        // const url = '/privacy';
        console.log(privacy);
        // Axios.put(url, { privacy });
    };

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    return (
        <>
            <Slate
                editor={editor}
                value={privacy}
                onChange={(newValue) => setPrivacy(newValue)}
            >
                <Editable
                    renderElement={renderElement}
                    onKeyDown={(e) => {
                        if (e.key === '&') {
                            e.preventDefault();
                            editor.insertText('and');
                        }

                        if (e.key === '`' && e.ctrlKey) {
                            e.preventDefault();
                            // Otherwise, set the currently selected blocks type to "code".
                            Transforms.setNodes(
                                editor,
                                { type: 'code' },
                                { match: (n) => Editor.isBlock(editor, n) },
                            );
                        }
                    }}
                />
            </Slate>

            <button type="button" onClick={saveHandler} className="btn btn-primary">Save</button>
        </>
    );
}

const CodeElement = ({ attributes, children }) => (
    <pre {...attributes}>
        <code>{children}</code>
    </pre>
);

const DefaultElement = ({ attributes, children }) => <p {...attributes}>{children}</p>;

export default Privacy;
