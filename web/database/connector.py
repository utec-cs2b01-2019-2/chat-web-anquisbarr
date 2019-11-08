from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

class Manager:
    Base = declarative_base()
    session = None

    def createEngine(self):
        uri = 'postgres://rmatvnywtusxkn:fb07a2b9c1d4485bb2676989b45ee9b6b6f90c22eb33df024ea4033ede788a6e@ec2-174-129-253-140.compute-1.amazonaws.com:5432/de8s0a2d458fvs'
        engine = create_engine(uri, echo=False)
        self.Base.metadata.create_all(engine)
        return engine

    def getSession(self, engine):
        if self.session == None:
            Session = sessionmaker(bind=engine)
            session = Session()

        return session

class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = None

            return fields

        return json.JSONEncoder.default(self, obj)
