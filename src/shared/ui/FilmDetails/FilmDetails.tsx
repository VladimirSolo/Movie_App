import { PageLoader } from "widgets/PageLoader";
import { useGetByIdQuery } from "widgets/api/moviesApi";
import { useParams } from "react-router";
import { AddToFavorite } from "features/FirebaseDB/ui/AddToFavorite/AddToFavorite";
import { useContext } from "react";
import { FeatureTelegramContext } from "app/providers/FeatureTelegramProvider";
import TelegramIcon from "shared/assets/icons/tg.svg";
import s from "./FilmDetails.module.scss";

const FilmDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetByIdQuery(id);

  const { isTelegramShareEnabled } = useContext(FeatureTelegramContext);

  const handleShareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${window.location.href}&text=WATHTHIS-${data.Title}`;
    window.open(telegramUrl, "_blank");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
      <div className={s.wrapper}>
          <div className={s.details}>
              <div className={s.poster}>
                  <img className={s.image} src={data.Poster} alt={data.Poster} />
                  <AddToFavorite />
                  {
                  isTelegramShareEnabled && (
                  <button
                    className={s.shared}
                    onClick={handleShareToTelegram}
                    type="button"
                  >
                      <p>Shared Telegram</p>
                      <TelegramIcon className={s.tg} />
                  </button>
                  )
}
              </div>
              <div className={s.about}>
                  <h1 className={s.name}>{data.Title}</h1>
                  <ul className={s.list}>
                      About film
                      <li className={s.item}>
                          <span className={s.title}>Year</span>
                          <span>{data.Year}</span>
                      </li>
                      <li className={s.item}>
                          <span className={s.title}>Country</span>
                          <span className={s.comma}>{data.Country}</span>
                      </li>
                      <li className={s.item}>
                          <span className={s.title}>Genres</span>
                          <span className={s.comma}>{data.Genre}</span>
                      </li>
                      <li className={s.item}>
                          <span className={s.title}>Director</span>
                          <span className={s.comma}>{data.Director}</span>
                      </li>
                      <li className={s.item}>
                          <span className={s.title}>Writer</span>
                          <span className={s.comma}>{data.Writer}</span>
                      </li>
                      <li className={s.item}>
                          <span className={s.title}>Actors</span>
                          <span className={s.comma}>{data.Actors}</span>
                      </li>
                  </ul>
              </div>
              <div className={s.stat}>
                  <span className={s.rating}>{data.imdbRating}</span>
                  <div className={s.vote}>
                      <span>{data.imdbVotes}</span>
                      <span className={s.votes}>votes</span>
                  </div>
              </div>
          </div>
          <div className={s.description}>
              {data.Plot}
          </div>
      </div>
  );
};

export default FilmDetails;
