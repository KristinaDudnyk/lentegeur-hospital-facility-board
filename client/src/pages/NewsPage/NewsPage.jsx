import "./NewsPage.css";
import Line from "../../components/Line/Line";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Card from "../../components/Card/Card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const NewsPage = () => {
	const fetchNewsArticles = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/news-articles?populate=images`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["news-articles"],
		queryFn: fetchNewsArticles,
	});
	const newsArticlesData = data?.data;

	const [searchValue, setSearchValue] = useState("");

	const handleSearch = (event) => {
		setSearchValue(event.target.value);
	};

	const filteredNewsArticles = newsArticlesData?.filter((newsArticle) => {
		const titleMatches = newsArticle.title
			.toLowerCase()
			.includes(searchValue.toLowerCase());
		const summaryMatches = newsArticle.summary
			.toLowerCase()
			.includes(searchValue.toLowerCase());
		const categoryMatches = newsArticle.category
			.toLowerCase()
			.includes(searchValue.toLowerCase());
		return titleMatches || summaryMatches || categoryMatches;
	});

	return (
		<div className="news-page">
			<h1>News</h1>
			<Line />
			{isLoading && <Loading />}
			{isError && <ErrorComponent errorMessage={error} />}
			{!!filteredNewsArticles && (
				<>
					<form className="search-form">
						<input
							type="text"
							placeholder="Search"
							value={searchValue}
							onChange={handleSearch}
						/>
						<p>
							{filteredNewsArticles.length} News Article
							{filteredNewsArticles.length > 1 ? "s" : ""} found
						</p>
					</form>
					<div className="cards-list-container">
						{filteredNewsArticles.map((newsArticle) => {
							const { id, title, slug, date, category, tags, summary } =
								newsArticle;
							const { url, alternativeText } = newsArticle.images[0];
							return (
								<Card
									key={id}
									title={title}
									slug={slug}
									image={url}
									alternativeText={alternativeText}
									date={date}
									category={category}
									tag={tags}
									summary={summary}
									pageName="news"
									passedClass="content"
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default NewsPage;
