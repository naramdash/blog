import { ButtonInvisible, Tooltip } from "@primer/components"
import { CheckIcon, CopyIcon } from "@primer/octicons-react"
import { Link } from "gatsby"
import React from "react"
import { Asset, Assets, Groups } from "../../consts/AzureResourceNaming"

export default function AzureResourceNamer() {
  const [selectedAsset, selectAsset] = React.useState<Asset>()
  return (
    <div>
      <h1>Azure Resource Namer</h1>
      <p>
        아래 계산 결과는{" "}
        <Link to="https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming">
          azure-best-practice
        </Link>
        에 근거하여 작성되었습니다.
      </p>

      <AssetSelector selectedAsset={selectedAsset} selectAsset={selectAsset} />
      {selectedAsset === undefined ? (
        <div>not selected</div>
      ) : (
        <Namer asset={selectedAsset} />
      )}
    </div>
  )
}

interface AssetSelectorProps {
  selectedAsset: Asset | undefined
  selectAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>
}
function AssetSelector(props: AssetSelectorProps) {
  const [search, setSearch] = React.useState("")

  function onSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const searchedAssets = Assets.filter((asset) =>
      asset.type.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    )

    if (searchedAssets.length > 0) {
      if (props.selectedAsset && searchedAssets.includes(props.selectedAsset)) {
        const index = searchedAssets.indexOf(props.selectedAsset)
        props.selectAsset(
          searchedAssets[index === searchedAssets.length - 1 ? 0 : index + 1],
        )
      } else {
        props.selectAsset(searchedAssets[0])
      }
    }
  }
  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <label>
          Resource Type Search
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value ?? "")}
          />
          엔터 클릭하여 순회
        </label>
        {Groups.map((group) => (
          <fieldset>
            <legend>{group}</legend>
            {Assets.filter((asset) => asset.group === group).map((asset) => (
              <label
                key={asset.type}
                style={{
                  backgroundColor:
                    search.length > 0 &&
                    asset.type
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                      ? "#2786B2"
                      : undefined,
                }}
              >
                <input
                  type="radio"
                  name="asset"
                  value={asset.type}
                  checked={asset.type === props.selectedAsset?.type}
                  onChange={() => props.selectAsset(asset)}
                />
                {asset.type}
              </label>
            ))}
          </fieldset>
        ))}
        <fieldset>
          <legend>General</legend>
        </fieldset>
      </form>
    </div>
  )
}

interface NamerProps {
  asset: Asset
}
function Namer(props: NamerProps) {
  const [namerInputs, setNamerInputs] = React.useState<string[]>(
    props.asset.format.inputs.map((input) => input.fixedName ?? ""),
  )
  const [clippyWorked, setClippyWorked] = React.useState(false)

  const output = React.useMemo(
    () =>
      namerInputs
        .filter((namerInput) => namerInput.length > 0)
        .join(props.asset.format.joinWith) + (props.asset.format.suffix ?? ""),
    [namerInputs, props],
  )

  function onChangeInput(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    setNamerInputs((prev) => [
      ...prev.slice(0, index),
      event.target.value ?? "",
      ...prev.slice(index + 1),
    ])
  }

  function onClickClippy(name: string) {
    navigator.clipboard.writeText(name)
    setClippyWorked(true)
    setTimeout(() => {
      setClippyWorked(false)
    }, 1500)
  }

  React.useEffect(() => {
    setNamerInputs(
      props.asset.format.inputs.map((input) => input.fixedName ?? ""),
    )
  }, [props])
  return (
    <div>
      <h2>{props.asset.type}</h2>
      <span>{props.asset.scope}</span>
      <form>
        {props.asset.format.inputs.map((input, index) => (
          <label key={index} style={{ display: "block" }}>
            {input.description}
            {input.mandatory && <span style={{ color: "red" }}>*</span>}
            <input
              type="text"
              name={input.description}
              disabled={typeof input.fixedName === "string"}
              required={input.mandatory}
              placeholder={input.placeholders.join(", ")}
              value={namerInputs[index]}
              onChange={(event) => onChangeInput(event, index)}
            />
          </label>
        ))}
        {props.asset.format.suffix && (
          <label style={{ display: "block" }}>
            suffix
            <span style={{ color: "red" }}>*</span>
            <input type="text" disabled value={props.asset.format.suffix} />
          </label>
        )}
        <label>
          결과:
          <output>
            {output}
            <ButtonInvisible
              css={{}}
              type="button"
              onClick={() => onClickClippy(output)}
            >
              {clippyWorked ? (
                <Tooltip aria-label="copied!" noDelay={true}>
                  <CheckIcon />
                </Tooltip>
              ) : (
                <CopyIcon />
              )}
            </ButtonInvisible>
          </output>
        </label>
      </form>
    </div>
  )
}
