import Image from "next/image";
import SwipeableViews from "react-swipeable-views";

import { Post as PostType } from "@/types";
import { getImageUri } from "@/utils/media";
import css from "./Post.module.css";

type Props = {
  post: PostType;
};

function Post({ post }: Props) {
  return (
    <div className="card mb-2">
      <div className="d-flex g-0">
        <div className={css.swiper}>
          <SwipeableViews enableMouseEvents>
            {post.medias.map((media) => (
              <Image
                key={media.id}
                className="img-fluid rounded-start"
                src={getImageUri(media.url)}
                width="150px"
                height="128px"
                layout="fixed"
                objectFit="cover"
                alt="loaded image"
              />
            ))}
          </SwipeableViews>
        </div>
        <div className="">
          <div className="card-body">
            <h5 className="card-title text-break">{post.name}</h5>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
