'use client';
import React, { useState } from 'react';
import { useGetReviews } from '@/hooks/useReviews';
import { Star, ThumbsUp, ThumbsDown, Shield, Calendar, User, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { SearchBox } from '@/components/FormElements/SearchBox/SearchBox';
import { Pagination } from '@/components/ui/pagination';

function ReviewCard({ review }: any) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="mb-6 w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header with user info and status */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={
                review.userId.image ||
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
              }
              alt={review.userId.name}
              className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
            />
            {review.isBlocked && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-red-500 p-1">
                <Shield size={12} className="text-white" />
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">{review.userId.name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            review.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {review.isBlocked ? 'Blocked' : 'Active'}
        </div>
      </div>

      {/* Stars and Comment */}
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2 flex">
          {stars.map((star) => (
            <Star
              key={star}
              size={20}
              className={`${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} mr-1`}
            />
          ))}
        </div>
        <span className="mb-2 text-lg font-bold text-gray-900">{review.rating}.0</span>
        <p className="w-full max-w-full text-center leading-relaxed text-gray-700">
          {review.comment || 'No comment provided.'}
        </p>
      </div>

      {/* Images */}
      {review.images?.length > 0 && (
        <div className="mb-4 flex flex-col items-center">
          <div className="mb-2 flex items-center text-sm text-gray-600">
            <ImageIcon size={16} className="mr-1" />
            <span>
              {review.images.length} photo{review.images.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3">
            {review.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                className="h-20 w-20 cursor-pointer rounded-xl object-cover shadow-md transition-transform hover:scale-105"
                alt={`Review image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Engagement */}
      <div className="flex w-full items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex space-x-6">
          <div className="flex items-center text-sm text-gray-600">
            <ThumbsUp size={16} className="mr-1 text-green-500" />
            <span className="font-medium">{review.likes.length}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ThumbsDown size={16} className="mr-1 text-red-500" />
            <span className="font-medium">{review.dislikes.length}</span>
          </div>
        </div>
        <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
          Manage Review
        </button>
      </div>
    </div>
  );
}

function Page() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch, isFetching } = useGetReviews({
    status: tab,
    search,
    sortBy,
    order,
    page,
  });
  console.log(data?.data?.data, 'data');

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Breadcrumb pageName="Reviews" />

      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Tabs */}
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'blocked', 'deleted'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                tab === t
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <SearchBox value={search} onChange={(value: any) => setSearch(value)} />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* Reload */}
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 shadow transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          disabled={isFetching}
        >
          <RefreshCcw size={18} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Review Cards */}
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {data?.data?.length === 0 ? (
            <div className="col-span-2 w-full py-12 text-center">
              <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <User size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">No reviews yet</h3>
                <p className="text-gray-600">Customer reviews will appear here once they start coming in.</p>
              </div>
            </div>
          ) : (
            data?.data?.data?.map((review: any) => <ReviewCard key={review._id} review={review} />)
          )}
        </div>
      </div>

      <Pagination
        totalPages={Math.ceil(data?.data?.total / 10)}
        page={page}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
    </>
  );
}

export default Page;
