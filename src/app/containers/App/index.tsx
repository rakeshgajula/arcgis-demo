import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { loadModules, Map } from 'react-arcgis';
import { Header, DocViewer } from '../../components';

export interface AppProps extends RouteComponentProps<any> {
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: TodoStore;
}

export interface AppState {
  map: any;
  view: any;
  csvLayer: any;
  docEntry: any;
}

export class App extends React.Component<AppProps, AppState> {
  private onMapLoad: any;
  private onCloseDocViwer: any;
  private data: any[] = [];
  constructor(props: AppProps, context: any) {
    super(props, context);
    this.state = {
      map: null,
      view: null,
      csvLayer: null,
      docEntry: null
    };
    this.onMapLoad = this.handleMapLoad.bind(this);
    this.onCloseDocViwer = this.handleDocViewerClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState): void {
    if (this.state.map) {
      this.state.map.add(this.state.csvLayer);
    }
  }

  componentDidMount() {
    loadModules([
      'esri/layers/CSVLayer',
      'esri/config',
      'esri/core/urlUtils',
      'esri/PopupTemplate'
    ]).then(([CSVLayer, esriConfig, urlUtils, PopupTemplate]) => {
      const url = 'https://www.mocky.io/v2/5b9ecc563000006e00e28b65';

      esriConfig.request.corsEnabledServers.push(url);
      const popupTemplate = new PopupTemplate({
        title: 'Document Information',
        content: '{description}',
        actions: [
          {
            title: 'Open Document',
            id: 'open-doc',
            className: 'esri-icon-link'
          }
        ]
      });

      const csvLayer = new CSVLayer({
        url: url,
        copyright: 'ArcGIS Demo',
        popupTemplate: popupTemplate,
        elevationInfo: {
          mode: 'on-the-ground'
        }
      });

      const citiesRenderer = {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          size: 15,
          color: 'black',
          outline: {
            width: 0.5,
            color: 'white'
          }
        }
      };

      csvLayer.renderer = citiesRenderer;
      this.setState({ csvLayer });
    });
  }

  componentWillReceiveProps(nextProps: AppProps, nextContext: any) {}

  render() {
    const docEntry: any = this.state.docEntry;
    return (
      <div>
        <Header />
        <div style={{ width: '100vw', height: '100vh' }}>
          <Map
            onLoad={(map, view) => {
              this.onMapLoad(map, view);
            }}
            mapProperties={{ basemap: 'streets' }}
            viewProperties={{
              center: [-72.51705652, 42.37433141],
              zoom: 16
            }}
          />
        </div>
        <DocViewer
          docEntry={docEntry}
          onClose={() => {
            this.onCloseDocViwer();
          }}
        />
      </div>
    );
  }

  private handleDocViewerClose(): void {
    this.setState({
      docEntry: null
    });
  }

  private handleMapLoad(map, view) {
    view.popup.on('trigger-action', (event) => {
      if (event.action.id === 'zoom-out') {
        view.goTo({
          center: view.center,
          zoom: view.zoom - 2
        });
      }

      if (event.action.id === 'open-doc') {
      }
    });

    view.popup.viewModel.on('trigger-action', (event) => {
      if (event.action.id === 'open-doc') {
        const attrs = view.popup.viewModel.selectedFeature.attributes;
        this.setState({ docEntry: attrs });
      }
    });

    view.on('click', (event) => {
      this.data.push({
        time: new Date().toISOString(),
        latitude: event.mapPoint.latitude,
        longitude: event.mapPoint.longitude
      });
    });

    this.setState({ map, view });
  }
}
