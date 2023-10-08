import { getReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReview(options);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      // getReview하고 있는 동안 삭제를 해버리면 삭제 함수 안에서 item의 state가 바뀌는데
      // 이 안에서 가지고 있는 Items는 getReview 전의 item 이기 때문에
      // await이 끝나면 바뀐 items가 아니라 원래의 items로 가져와서 랜더링한다.
      // setter 함수에서는 이전의 값을 parameter로 넘겨주는 콜백으로 줄 수 있는데, 이렇게 해야 비동기로인해
      // 발생하는 문제를 해결할 수 있다.

      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);
  // useEffect 는 콜백함수와 dependcyList를 argument로 받음, list가 바뀔 떄만 콜백 랜더링함
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />

      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
