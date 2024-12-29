defmodule PublicTransportEtlPipeline.Consumer do
  use GenStage

  def start_link(_opts) do
    GenStage.start_link(__MODULE__, :state_doesnt_matter)
  end

  def init(state) do
    {:consumer, state, subscribe_to: [PublicTransportEtlPipeline.DataTransform]}
  end

  def handle_events(_events, _from, state) do
    # for event <- events do
    #   IO.inspect({self(), event, state})
    # end

    {:noreply, [], state}
  end
end
