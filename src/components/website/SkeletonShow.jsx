import Skeleton from "react-loading-skeleton";

export default function SkeletonShow({ height, width, number, classes = "" }) {
  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <div key={index} className={classes}>
          <Skeleton
            height={height}
            width={width}
            baseColor="lightgray"
            highlightColor="white"
            className="m-1"
          />
        </div>

      ))}
    </>
  );
}