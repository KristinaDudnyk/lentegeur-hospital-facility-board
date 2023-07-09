import "./ServicePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Line from "../../components/Line/Line";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import parseContent from "../../utils/parseContent";

const ServicePage = () => {
	const { slug } = useParams();

	const fetchService = async (slug) => {
		const response = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/services?filters[slug][$eq]=${slug}&populate=images`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["services", slug],
		queryFn: () => fetchService(slug),
	});
	const serviceData = data?.data[0];

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	console.log(data?.data[0]);

	return (
		<div className="service-page">
			{isLoading && <Loading />}
			{isError && <ErrorComponent errorMessage={error} />}
			{!!serviceData && (
				<>
					<h1>{serviceData.title}</h1>
					<Line />
					<div className="service-image-container">
						<img
							className="service-image"
							src={serviceData.images[0].url}
							alt={serviceData.images[0].alternativeText}
						/>
					</div>
					<div className="service-category-tag-container">
						<p>Category: {serviceData.category}</p>
						<p>Tags: {serviceData.tags}</p>
					</div>
					<div className="service-content-container">
						{parseContent(serviceData.content)}
					</div>
				</>
			)}
			<GoBackButton goBack={goBack} />
		</div>
	);
};

export default ServicePage;
