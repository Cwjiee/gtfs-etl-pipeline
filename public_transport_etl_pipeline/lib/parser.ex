defmodule GTFSRealtimeParser do
  @moduledoc """
  A module to fetch and parse GTFS-Realtime vehicle positions of RapidKl transports data in .proto format
  """

  alias TransitRealtime.FeedMessage

  def fetch_and_parse(url) do
    case HTTPoison.get(url, [], follow_redirect: true) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        IO.puts("fetched")
        parse_gtfs(body)

      {:ok, %HTTPoison.Response{status_code: status}} ->
        IO.puts("Received status code #{status}")

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end

  defp parse_gtfs(body) do
    feed = FeedMessage.decode(body)
    vehicle_positions =
      feed.entity
      |> Enum.map(fn entity -> 
        entity.vehicle
        |> Protobuf.JSON.to_encodable()
      end)

    IO.inspect(vehicle_positions, label: "vehicle positions")

    IO.puts("Total vehicles: #{length(vehicle_positions)}")
    {:ok, vehicle_positions}
  end
end
