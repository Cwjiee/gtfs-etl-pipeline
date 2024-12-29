defmodule PublicTransportEtlPipeline.MixProject do
  use Mix.Project

  def project do
    [
      app: :public_transport_etl_pipeline,
      version: "0.1.0",
      elixir: "~> 1.17",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {PublicTransportEtlPipeline.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:gen_stage, "~> 1.2.1"},
      {:httpoison, "~> 2.0"},
      {:protobuf, "~> 0.13.0"},
      {:jason, "~> 1.4.4"}
    ]
  end
end
