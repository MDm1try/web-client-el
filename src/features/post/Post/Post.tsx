import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Carousel from "react-bootstrap/Carousel";
import useTranslation from "next-translate/useTranslation";

import { getImageUri } from "@/utils/media";
import useAccountPost from "@/hooks/account/useAccountPost";

import { Avatar } from "@/components/Avatar";
import { LAND_PURPOSE_MAP } from "@/constants";
import css from "./Post.module.scss";

function Post() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [isPhoneShown, setPhoneShown] = useState(false);

  const { t, lang } = useTranslation(`post`);
  const { error, data, isLoading } = useAccountPost(id);

  const createdAt = data?.post?.createdAt
    ? new Date(data?.post.createdAt).toLocaleDateString(lang, {
        day: `numeric`,
        month: `short`,
        year: `numeric`,
      })
    : null;

  const publishedAt = data?.post?.publishedAt
    ? new Date(data?.post.publishedAt).toLocaleDateString(lang, {
        day: `numeric`,
        month: `short`,
        year: `numeric`,
      })
    : null;

  return (
    <div className="container my-4 py-3 bg-white rounded-3">
      {error && <div className="text-danger mb-3">{error.message}</div>}
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="row">
        <div className="col-12 col-md-7 col-lg-8">
          <Carousel className="mb-3" interval={null} wrap={false} touch>
            {data?.post?.medias.map((media) => (
              <Carousel.Item key={media.id} className={css.imageContanier}>
                <div className="d-flex flex-column h-100">
                  <Image
                    src={getImageUri(media.url)}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    alt="post image"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <h3 className="d-block d-md-none mb-3">{data?.post.name}</h3>
          <h2 className="d-block d-md-none mb-3">
            {data?.post.cost} {data?.post.currency}
            {` `}
            {data?.post?.costPer ? t(data.post.costPer) : ``}
          </h2>
          <div className="d-block d-md-none mb-3">
            <div className="fw-bold">Кадастровый номер:</div>
            <div>{data?.post.cadNum}</div>
          </div>
          <div className="d-block d-md-none mb-3">
            <div className="fw-bold">Площадь:</div>
            <div>{data?.post.areaHectares} Га</div>
          </div>
          {data?.post.purpose != null && (
            <div className="d-block d-md-none mb-3">
              {t(LAND_PURPOSE_MAP[data?.post.purpose])}
            </div>
          )}
          <h5>Описание:</h5>
          <div className="mb-3">{data?.post.description}</div>
        </div>
        <div className="col-12 col-md-5 col-lg-4 pe-md-4">
          <h2 className="d-none d-md-block mt-md-2">{data?.post.name}</h2>
          <h3 className="d-none d-md-block my-3">
            {data?.post.cost} {data?.post.currency}
            {` `}
            {data?.post?.costPer ? t(data.post.costPer) : ``}
          </h3>
          <div className="d-none d-md-flex flex-column flex-lg-row justify-content-between mb-2">
            <div className="fw-light me-2">Кадастровый номер:</div>
            <div>{data?.post.cadNum}</div>
          </div>
          <div className="d-none d-md-flex justify-content-between mb-2">
            <div className="fw-light me-2">Площадь:</div>
            <div>{data?.post.areaHectares} Га</div>
          </div>
          {createdAt && (
            <div className="d-flex flex-column flex-lg-row justify-content-between mb-2">
              <div className="fw-bold fw-md-light me-2">Дата создания:</div>
              <div>{createdAt}</div>
            </div>
          )}
          {publishedAt && (
            <div className="d-flex flex-column flex-lg-row justify-content-between mb-2">
              <div className="fw-bold fw-md-light me-2">Дата публикации:</div>
              <div>{publishedAt}</div>
            </div>
          )}
          {data?.post.purpose != null && (
            <div className="d-none d-md-block">
              {t(LAND_PURPOSE_MAP[data?.post.purpose])}
            </div>
          )}
          <div className="d-flex flex-row justify-content-between mt-5 mt-md-4">
            <div className="d-flex justify-content-center w-100">
              <Avatar />
            </div>
            <div className="ms-md-3 w-100">
              <div className="fw-bold text-bold mb-3">{data?.user.name}</div>
              {isPhoneShown ? (
                <button
                  type="button"
                  className="btn btn-outline-dark w-100"
                  onClick={() => window.open(`tel:${data?.user.phone}`)}
                >
                  <i className="bi bi-telephone-fill me-2" />
                  {data?.user.phone}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={() => setPhoneShown(true)}
                >
                  <i className="bi bi-telephone-fill me-2" />
                  Показать телефон
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
