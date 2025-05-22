import { Toaster } from "react-hot-toast";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { getImages } from "../ApiServices/api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { ImageItem } from "./App.types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const data = await getImages(query, page);
        if (data.results.length === 0) {
          toast("No image found of your request!");
          setIsEmpty(true);
          return;
        }

        const preparedImages = data.results.map(
          ({ id, urls, alt_description, likes }) => ({
            id,
            alt: alt_description,
            urlSm: urls.small,
            urlReg: urls.regular,
            likes,
          })
        );

        setImages((prev) => [...prev, ...preparedImages]);
        setTotalPages(data.total_pages);
        setIsVisible(page < data.total_pages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Network error: Unable to fetch images.");
        } else {
          setError("Unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(null);
    setIsVisible(false);
  };

  const closeModal = (modalSrc: string, modalAlt: string): void => {
    setModalIsOpen(false);
  };

  const openModal = (modalSrc: string, modalAlt: string) => {
    setModalIsOpen(true);
    setModalSrc(modalSrc);
    setModalAlt(modalAlt);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />

          {isVisible && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {isLoadingMore && (
                <BeatLoader
                  color="#36d7b7"
                  size={12}
                  style={{ marginBottom: "10px" }}
                />
              )}
              <LoadMoreBtn
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoadingMore}
              />
            </div>
          )}
        </>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />

      <Toaster />
    </>
  );
}

export default App;
