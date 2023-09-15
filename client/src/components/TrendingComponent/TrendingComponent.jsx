import React from "react";
const trendingData = [
  {
    trending_category: "Sports",
    trending_topic: "#INDvsPAK",
    tweets_count: "166k posts",
  },
  {
    trending_category: "Technology",
    trending_topic: "#TechNews",
    tweets_count: "102k posts",
  },
  {
    trending_category: "Entertainment",
    trending_topic: "#MovieNight",
    tweets_count: "75k posts",
  },
  {
    trending_category: "Food",
    trending_topic: "#FoodieFriday",
    tweets_count: "54k posts",
  },
  {
    trending_category: "Travel",
    trending_topic: "#TravelDiaries",
    tweets_count: "42k posts",
  },
  {
    trending_category: "Health",
    trending_topic: "#WellnessWednesday",
    tweets_count: "38k posts",
  },
  {
    trending_category: "Fashion",
    trending_topic: "#FashionTrends",
    tweets_count: "62k posts",
  },
  {
    trending_category: "Music",
    trending_topic: "#MusicMonday",
    tweets_count: "89k posts",
  },
  {
    trending_category: "Science",
    trending_topic: "#ScienceFacts",
    tweets_count: "27k posts",
  },
  {
    trending_category: "Nature",
    trending_topic: "#NaturePhotography",
    tweets_count: "48k posts",
  },
];
export default function TrendingComponent() {
  return (
    <div className="trends_rightbar">
      <h1 className="head_rightbar" style={{ paddingTop: "15px" }}>
        Trends for you
      </h1>
      {trendingData?.map((e, index) => (
        <div key={index} className="trending_content">
          <div className="trending_name">
            <p className="trending_category">
              {e.trending_category} . Trending
            </p>
            <p className="trending_topic">{e.trending_topic}</p>
            <p className="tweets_num">{e.tweets_count}</p>
          </div>
          <div className="more_options">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  fill="var(--theme-color)"
                  d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
