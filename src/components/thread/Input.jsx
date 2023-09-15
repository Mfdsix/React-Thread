import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { asyncAddThread } from "../../states/threads/action";
import { FaSpinner } from "react-icons/fa";

function ThreadInput() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const categories = [
    'Fun', 'Sport', 'Movie', 'Others'
  ];

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      asyncAddThread({
        title,
        body: content,
        category,
      })
    );
  };

  useEffect(() => {
    if (!title || !category || !content) {
      if (!title) setTitleError("Title must be filled");
      if (!category) setCategoryError("Category must be selected");
      if (!content) setContentError("Content must be selected");

      setFormDisabled(true);
    }

    return () => {
      setTitleError("");
      setCategoryError("");
      setContentError("");
      setFormDisabled(false);
    };
  }, [title, category, content]);

  return (
    <>
      <div>
        <div className="my-1">
          <h3>Post Your Thread</h3>
        </div>

        <form onSubmit={onFormSubmit}>
          <div>
            <div className="form__group form__limit__char">
              <input
                value={title}
                onChange={onTitleChange}
                type="text"
                placeholder="Title"
                className="form__input"
              />
              {titleError && (
                <span className="form__invalid__feedback">*( {titleError}</span>
              )}
            </div>

            <div className="form__group form__limit__char">
              <select
                className="form__input"
                defaultValue={category}
                onChange={onCategoryChange}
              >
                <option value="">Select Category</option>
                { categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                )) }
              </select>
              {categoryError && (
                <span className="form__invalid__feedback">
                  *( {categoryError}
                </span>
              )}
            </div>

            <div className="form__group form__limit__char">
              <textarea
                onChange={onContentChange}
                defaultValue={content}
                className="form__input"
                cols="30"
                rows="10"
              ></textarea>
              {contentError && (
                <span className="form__invalid__feedback">
                  *( {contentError}
                </span>
              )}
            </div>
          </div>
          <div className="form__action flex__end">
            <button
            disabled={formDisabled || formLoading}
            type="submit" className="btn btn__submit">
              {formLoading ? <FaSpinner /> : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ThreadInput;
